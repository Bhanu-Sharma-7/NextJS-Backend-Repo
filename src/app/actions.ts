'use server'; // Ye batata hai ki ye saare functions sirf server par chalenge.

import prisma from '@/lib/prisma'; // Database connection import kiya.
import { revalidatePath } from 'next/cache'; // Page refresh (data update) karne ke liye use hota hai.

// Todo ka structure define kar rahe hain taaki TypeScript ko pata chale data kaisa dikhega.
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Saare tasks ko database se nikalne ke liye function.
export async function getTodos(): Promise<Todo[]> {
  try {
    // Database se saare todos dhoondo aur newest tasks ko pehle dikhao.
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return todos as Todo[]; // Inferred type ko humne manually Todo[] cast kiya safety ke liye.
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    return [] as Todo[]; // Agar error aaye toh empty list return karo.
  }
}

// Naya task add karne ke liye function.
export async function addTodo(formData: FormData) {
  // Form se 'title' nikal rahe hain jo input field mein likha tha.
  const title = formData.get('title') as string;
  if (!title || title.trim() === '') return; // Agar title khaali hai toh kuch mat karo.

  try {
    // Database mein naya record create karo.
    await prisma.todo.create({
      data: { title },
    });
    revalidatePath('/'); // Home page ko refresh karo taaki naya task dikhne lage.
  } catch (error) {
    console.error('Failed to add todo:', error);
  }
}

// Task ko complete ya incomplete mark karne ke liye function.
export async function toggleTodo(id: number, completed: boolean) {
  try {
    // ID ke basis par task update karo.
    await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    revalidatePath('/'); // Page refresh karo changes dikhane ke liye.
  } catch (error) {
    console.error('Failed to toggle todo:', error);
  }
}

// Task ko permanently delete karne ke liye function.
export async function deleteTodo(id: number) {
  try {
    // Database se record remove karo.
    await prisma.todo.delete({
      where: { id },
    });
    revalidatePath('/'); // Refresh page.
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
}

// Task ka title badalne (edit karne) ke liye function.
export async function updateTodoTitle(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  if (!title || title.trim() === '') return;

  try {
    // Purane title ko naye title se replace karo.
    await prisma.todo.update({
      where: { id },
      data: { title },
    });
    revalidatePath('/'); // Refresh refresh refresh!
  } catch (error) {
    console.error('Failed to update todo title:', error);
  }
}
