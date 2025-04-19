import { PrismaClient } from '../generated/prisma'
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  console.log('yash')
 // Delete in reverse order to respect foreign key constraints
 const deleteOrder = [
  "expenseByCategory",   // Delete child records first
  "expenses",
  "sales",
  "purchases",
  "expenseSummary",      // Then delete parent records
  "salesSummary",
  "purchaseSummary",
  "products",
  "users"
];

for (const modelName of deleteOrder) {
  // Convert to PascalCase for Prisma model names
  const pascalCaseModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  const model: any = prisma[pascalCaseModelName as keyof typeof prisma];
  
  if (model) {
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${pascalCaseModelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${pascalCaseModelName}:`, error);
    }
  } else {
    console.error(
      `Model ${pascalCaseModelName} not found. Please ensure the model name is correctly specified.`
    );
  }
}
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    try {
      const filePath = path.join(dataDirectory, fileName);
      // Read file and replace NULL bytes with empty string
      const fileContent = fs.readFileSync(filePath, "utf-8").replace(/\u0000/g, '');
      const jsonData = JSON.parse(fileContent);
      
      const modelName = path.basename(fileName, path.extname(fileName));
      const model: any = prisma[modelName as keyof typeof prisma];

      if (!model) {
        console.error(`No Prisma model matches the file name: ${fileName}`);
        continue;
      }

      console.log(`Seeding ${jsonData.length} items for ${modelName}...`);
      
      for (const data of jsonData) {
        try {
          await model.create({
            data,
          });
        } catch (itemError) {
          console.error(`Error inserting item in ${fileName}:`, itemError);
          console.error('Problematic data:', JSON.stringify(data));
        }
      }

      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (fileError) {
      console.error(`Error processing file ${fileName}:`, fileError);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });