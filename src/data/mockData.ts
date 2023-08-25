import { Categories, Category, GenerateMockData, SubCategory } from "../types";

function generateDateValues(
  startYear: number,
  endYear: number,
  startMonth: number,
  endMonth: number
): string[] {
  const dates: string[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const monthStart = year === startYear ? startMonth : 1;
    const monthEnd = year === endYear ? endMonth : 12;

    for (let month = monthStart; month <= monthEnd; month++) {
      const dateString = `${year}-${month < 10 ? "0" + month : month}`;
      dates.push(dateString);
    }
  }

  return dates;
}
const startYear = 2022;
const endYear = 2024;
const startMonth = 9;
const endMonth = 10;

const dates: string[] = generateDateValues(
  startYear,
  endYear,
  startMonth,
  endMonth
);

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

const bankData: Category = {
  name: "Banks",
  amount: 0,
  breakdown: [
    {
      name: "First Republic Savings",
      amount: 0,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -10000.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -2000.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "01",
          amount: -1387.0,
        },
      ],
    },
    {
      name: "Chase Checking",
      amount: 0,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -150.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -600.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "01",
          amount: -817.0,
        },
      ],
    },
  ],
};

// Calculate the total amount and breakdowns' total amount
let totalAmount = 0;
bankData?.breakdown?.forEach((breakdown) => {
  let breakdownTotal = 0;
  breakdown?.transactions?.forEach((transaction) => {
    breakdownTotal += transaction.amount;
  });
  breakdown.amount = breakdownTotal;
  totalAmount += breakdownTotal;
});
bankData.amount = totalAmount;

const creditCardsData: Category = {
  name: "Credit Cards",
  amount: 0,
};

const cogsData: Category = {
  name: "Cost Of Goods Sold",
  amount: -2500,
  breakdown: [
    {
      name: "Raw Materials",
      amount: -1500,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -700.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -300.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "01",
          amount: -500.0,
        },
      ],
    },
    {
      name: "Labor Costs",
      amount: -1000,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -500.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -200.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "01",
          amount: -300.0,
        },
      ],
    },
  ],
};

const incomeData: Category = {
  name: "Income",
  amount: 5000,
  breakdown: [
    {
      name: "Sales Revenue",
      amount: 4000,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -2000.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -600.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "01",
          amount: -1400.0,
        },
      ],
    },
    {
      name: "Other Income",
      amount: 1000,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -500.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -200.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "01",
          amount: -300.0,
        },
      ],
    },
  ],
};

const expenseData: Category = {
  name: "Expense",
  amount: -1200,
  breakdown: [
    {
      name: "Bank Charge & Fees",
      amount: -100,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -188.96,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -6.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "01",
          amount: -18.0,
        },
      ],
    },
    {
      name: "Legal Services",
      amount: -600,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -200.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -250.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "01",
          amount: -150.0,
        },
      ],
    },
    {
      name: "Taxes & Licenses",
      amount: -300,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -100,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -150,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "01",
          amount: -50,
        },
      ],
    },
    {
      name: "Office Supplies & Software",
      amount: -200,
      transactions: [
        {
          id: randomId(),
          name: "Google",
          service: "Google Ads",
          date: "01",
          amount: -188.96,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Workspace",
          date: "01",
          amount: -6.0,
        },
        {
          id: randomId(),
          name: "Google",
          service: "Google Domains",
          date: "10/01/22",
          amount: -18.0,
        },
      ],
    },
  ],
};

const allData = {
  banks: bankData,
  cogs: cogsData,
  income: incomeData,
  expense: expenseData,
  credit: creditCardsData,
};

const generateMockData: GenerateMockData = (
  data: Categories,
  dates: string[]
) => {
  return dates.map((date) => {
    const [year, month] = date.split("-");
    const dataDeepCopy = JSON.parse(JSON.stringify(data));
    const categories = dataDeepCopy as Categories;
    Object.keys(categories).forEach((categoryName) => {
      const category = categories[categoryName as keyof Categories];
      category.breakdown?.forEach((breakdown: SubCategory) => {
        breakdown.transactions?.forEach((transaction) => {
          const day = String(Math.floor(Math.random() * 30) + 1).padStart(
            2,
            "0"
          );

          transaction.date = `${month}/${day}/${year}`; // Assign formatted date
        });
      });
    });
    return { date, categories };
  });
};

const mockData = generateMockData(allData, dates);

export { mockData };
