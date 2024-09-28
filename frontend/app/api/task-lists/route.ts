// app/api/task-lists/route.ts
import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/backend/utils/mongoose';
import { createTaskList, getTaskLists, deleteTaskList } from '@/backend/controllers/taskListController';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  await dbConnect();

  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const taskLists = await getTaskLists(userId); // Fetch task lists for the authenticated user
  return NextResponse.json(taskLists);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  body.owner = userId; // Assign the task list to the authenticated user
  const newTaskList = await createTaskList(body);
  return NextResponse.json(newTaskList, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  await deleteTaskList(body.taskListId);
  return NextResponse.json({ message: 'Task list deleted' });
}
