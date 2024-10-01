import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CommentProvider } from ".";
import { OdeClientProvider } from "../..";

const meta: Meta<typeof CommentProvider> = {
  title: "Modules/Comments",
  component: CommentProvider,
  parameters: {
    docs: {
      description: {
        component:
          "CommentProvider allows to add a comments section in your app",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CommentProvider>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2,
    },
  },
});

export const Base: Story = {
  render: (_args) => {
    return (
      <CommentProvider
        type="edit"
        comments={[
          {
            id: "a2b1-cdf3",
            comment: "This is my first comment",
            authorId: "64bfd-30eab",
            authorName: "John Doe",
            createdAt: 1231931,
            updatedAt: 230311,
          },
          {
            id: "a2b1-cd2f",
            comment: "This is my own comment",
            authorId: "64bfd-30eab",
            authorName: "Catherine Bailly",
            createdAt: 1231931,
            updatedAt: 230311,
          },
        ]}
        options={{
          maxCommentLength: 800,
          maxReplyLength: 200,
          maxComments: 10,
          maxReplies: 5,
          additionalComments: 5,
        }}
        callbacks={{
          post: (comment) => console.log(comment),
          put: ({ comment, commentId }) => console.log({ comment, commentId }),
          delete: (commentId) => console.log(commentId),
        }}
      />
    );
  },
};

export const ReadComments: Story = {
  render: (_args) => {
    return (
      <QueryClientProvider client={queryClient}>
        <OdeClientProvider params={{ app: "blog" }}>
          <CommentProvider
            type="read"
            comments={[
              {
                id: "a2b1-cdf3",
                comment: "This is my first comment",
                authorId: "64bfd-30eab",
                authorName: "John Doe",
                createdAt: 1231931,
                updatedAt: 230311,
              },
            ]}
          />
        </OdeClientProvider>
      </QueryClientProvider>
    );
  },
};
