import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";
import { resolve } from "path";
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const event = Object.fromEntries(formData.entries());
    const file=formData.get('image') as File;
    if(!file){
      return NextResponse.json({message:'image file is required'},{status:400});

    }
    const arrayBuffer=await file.arrayBuffer();
    const buffer=Buffer.from(arrayBuffer);
    const uploadResult=await  new Promise((resolve,reject)=>{
      cloudinary.uploader.upload_stream({resource_type:'image',folder:'devevent'},(error,results)=>{
        if(error) return reject(error);

        resolve(results);
      }).end(buffer);
    })
    event.image=(uploadResult as {secure_url:string}).secure_url;
    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: "event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "event creation failed",
        error: e instanceof Error ? e.message : "unknown",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try{
    await connectDB();
    const event=await Event.find().sort({createdAt:-1});
    // if(!event){
    //   return NextResponse.json({message:'now event found'},{status:404})
    // }
    return NextResponse.json({message:"events fetched succesfully",event},{status:202});

  }
  catch(e){
    return NextResponse.json({message:'event fetching failed'},{status:500});
  }
  
}
