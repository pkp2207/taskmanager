// app/api/task-lists/route.ts
import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/backend/utils/mongoose';
import { createTaskList, getTaskLists, deleteTaskList } from '@/backend/controllers/taskListController';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node'; // Import clerkClient directly

export async function GET(req: NextRequest) {
  await dbConnect();

  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch user data from Clerk using userId
    const user = await clerkClient.users.getUser(userId); // Use clerkClient to fetch user
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const taskLists = await getTaskLists(user.username); // Fetch task lists for the authenticated user
    return NextResponse.json(taskLists);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ message: 'Error fetching user data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch user data from Clerk using userId
    const user = await clerkClient.users.getUser(userId); // Use clerkClient to fetch user
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    body.ownerName = user.username; // Assign the username to ownerName
    const newTaskList = await createTaskList(body);
    return NextResponse.json(newTaskList, { status: 201 });
  } catch (error) {
    console.error('Error creating task list:', error);
    return NextResponse.json({ message: 'Error creating task list' }, { status: 500 });
  }
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
