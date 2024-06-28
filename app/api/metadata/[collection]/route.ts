import db from 'lib/db';
import { NextRequest, NextResponse } from 'next/server';

type CollectionMetadata = {
  name: string;
  description: string;
  image: string;
  external_link: string;
};

type Params = {
  params: { collection: string };
};

export async function GET(request: NextRequest, { params }: Params): Promise<NextResponse> {
  const { collection: id } = params;

  if (!id) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  const collection = await db.nFTCollection.findFirst({ where: { id } });

  if (!collection) {
    return NextResponse.json({ error: `Collection ${id} not found` }, { status: 404 });
  }

  const metadata: CollectionMetadata = {
    name: collection.name,
    description: collection.description,
    image: collection.image,
    external_link: collection.externalLink
  };

  return NextResponse.json(metadata);
}
