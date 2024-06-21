import OpengraphImage from 'components/opengraph-image';
import api from 'lib/services';

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const page = await api.getPage(params.page);
  const title = page.title;

  return await OpengraphImage({ title });
}
