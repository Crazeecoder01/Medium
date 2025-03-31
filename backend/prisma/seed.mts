import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.subscriptionPlan.createMany({
    data: [
      { 
        name: "Basic", 
        price: 0, 
        duration: 30, 
        details: "Ideal for casual users who want to read and write blogs occasionally. Limited writing & interaction features. Ads displayed." 
      },
      { 
        name: "Pro", 
        price: 500, 
        duration: 30, 
        details: "Unlimited blog posting, better SEO, and monetization options. Some ad removal & access to premium features." 
      },
      { 
        name: "Premium", 
        price: 1500, 
        duration: 30, 
        details: "Zero ads, premium sponsorships, advanced analytics, and branding tools. 24/7 premium support for professional bloggers." 
      },
    ],
    skipDuplicates: true, 
  });

  console.log("✅ Subscription plans added!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
