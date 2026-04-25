'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Defining the type locally to ensure the UI is always type-safe
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getTodos(): Promise<Todo[]> {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return todos as Todo[];
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    return [] as Todo[];
  }
}

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title || title.trim() === '') return;

  try {
    await prisma.todo.create({
      data: { title },
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to add todo:', error);
  }
}

export async function toggleTodo(id: number, completed: boolean) {
  try {
    await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to toggle todo:', error);
  }
}

export async function deleteTodo(id: number) {
  try {
    await prisma.todo.delete({
      where: { id },
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
}

export async function updateTodoTitle(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  if (!title || title.trim() === '') return;

  try {
    await prisma.todo.update({
      where: { id },
      data: { title },
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to update todo title:', error);
  }
}
