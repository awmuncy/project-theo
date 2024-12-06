'use server'
 
import { redirect } from 'next/navigation'
 
export async function scroungeWishingTree() {

 
  redirect('/inventory')
}

export async function buyWishingTree() {

  redirect('/inventory')
}
