import db from 'lib/db';
import { safeJsonParse } from 'lib/utils/utils';
import { NextResponse } from 'next/server';

type TokenMetadata = {
  id: number;
  image: string;
  token_id: string;
  name: string;
  description: string;
  external_url: string;
  attributes?: Record<string, unknown>[];
} & Record<string, unknown>;

export const dynamic = 'force-dynamic';
export async function GET(): Promise<NextResponse> {
  const tokens = await db.tokens.findMany();

  if (!tokens.length) {
    return NextResponse.json({ message: `No tokens found` }, { status: 404 });
  }

  const metadata: TokenMetadata[] = tokens.map((token) => ({
    id: token.id,
    image: token.image,
    token_id: token.tokenId,
    name: token.name,
    description: token.description,
    external_url: token.externalLink,
    attributes: safeJsonParse(token.attributes, [])
  }));

  return NextResponse.json(metadata);
}
