export interface Meal {
  id: number,
  title: string, 
  content: string, 
  price: number, 
  category: string,
}

export interface Category {
  category: string
  category_id: number
}

export type AvailableMeals = Meal[];