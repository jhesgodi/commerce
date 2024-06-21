import OpengraphImage from 'components/opengraph-image';
import api from 'lib/services';

export const runtime = 'edge';

export default async function Image({ params }: { params: { collection: string } }) {
  const category = await api.getCategory(params.collection);
  const title = category?.title;

  return await OpengraphImage({ title });
}
