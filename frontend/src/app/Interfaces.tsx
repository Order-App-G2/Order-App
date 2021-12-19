export interface Meal {
  title: string, 
  content: string, 
  price: number, 
  category: string,
}

export type AvailableMeals = Meal[];