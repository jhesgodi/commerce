import db from 'lib/db';
import { safeJsonParse } from 'lib/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: { id: string };
};

type TokenMetadata = {
  id: number;
  image: string;
  token_id: string;
  name: string;
  description: string;
  external_url: string;
  attributes?: Record<string, unknown>[];
} & Record<string, unknown>;

export async function GET(_: NextRequest, { params }: Params): Promise<NextResponse> {
  const { id: tokenId } = params;

  const token = await db.tokens.findFirst({ where: { tokenId } });

  if (!token) {
    return NextResponse.json({ message: `Token ${tokenId} not found` }, { status: 404 });
  }

  const tokenMetadata: TokenMetadata = {
    id: token.id,
    image: token.image,
    token_id: token.tokenId,
    name: token.name,
    description: token.description,
    external_url: token.externalLink,
    attributes: safeJsonParse(token.attributes, [])
  };

  return NextResponse.json(tokenMetadata);
}
