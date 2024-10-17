import { GetStaticProps } from 'next';
import client from '@/lib/apolloClient';
import { GET_POST_TITLES } from '@/GraphQl/queries/getPosts';
import { BlogProps } from '@/types/blog';

export const getBlogStaticProps: GetStaticProps<BlogProps> = async () => {
  try {
    const { data } = await client.query({
      query: GET_POST_TITLES,
    });

    const posts = data.posts.edges.map((edge: any) => ({
      id: edge.node.id,
      slug: edge.node.slug,
      title: edge.node.title,
      category: edge.node.categories.nodes[0].name,
    }));

    return {
      props: {
        posts,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};
