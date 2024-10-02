import { Meta, StoryObj } from "@storybook/react";
import { CommentProvider } from ".";

import { HttpResponse, http } from "msw";
import { useState } from "react";
import { CommentProps } from "./types";

const meta: Meta<typeof CommentProvider> = {
  title: "Modules/Comments",
  component: CommentProvider,
  parameters: {
    docs: {
      description: {
        component:
          "`CommentProvider` component allows to add a comments section in your app",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CommentProvider>;

export const Base: Story = {
  render: (_args) => {
    return (
      <CommentProvider
        type="edit"
        comments={[
          {
            id: "a2b1-cdf3",
            comment: "This is my first comment",
            authorId: "91c22b66-ba1b-4fde-a3fe-95219cc18d4a",
            authorName: "John Doe",
            createdAt: 1726757643336,
          },
          {
            id: "a2b1-cd2f",
            comment: "This is my own comment",
            authorId: "64bfd-30eab",
            authorName: "Catherine Bailly",
            createdAt: 1726069313281,
            updatedAt: 1726069313281,
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
  parameters: {
    msw: {
      handlers: [
        http.get(
          "/userbook/api/person?id=91c22b66-ba1b-4fde-a3fe-95219cc18d4a",
          () => {
            return HttpResponse.json({
              status: "ok",
              result: [
                {
                  id: "91c22b66-ba1b-4fde-a3fe-95219cc18d4a",
                  login: "John Doe",
                  displayName: "John Doe",
                  type: ["Student"],
                  visibleInfos: [],
                  schools: [
                    {
                      exports: null,
                      classes: [],
                      name: "School",
                      id: "bfaac2c1",
                      UAI: null,
                    },
                  ],
                  relatedName: null,
                  relatedId: null,
                  relatedType: null,
                  userId: "91c22b66-ba1b-4fde-a3fe-95219cc18d4a",
                  motto: "",
                  photo: "/userbook/avatar/f6c5ea40",
                  mood: "default",
                  health: "",
                  address: "",
                  email: "",
                  tel: null,
                  mobile: "",
                  birthdate: "2023-09-25",
                  hobbies: [],
                },
              ],
            });
          },
        ),
        http.get(
          "/userbook/avatar/91c22b66-ba1b-4fde-a3fe-95219cc18d4a?thumbnail=100x100",
          () => {
            return HttpResponse.text(
              "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
            );
          },
        ),
      ],
    },
  },
};

export const CreateComment: Story = {
  render: (_args) => {
    const [comments, setComments] = useState<CommentProps[]>([]);

    const handleOnPostComment = async (comment) => {
      setComments([
        {
          id: "a2b1-cdf3",
          comment,
          authorId: "f6c5ea40",
          authorName: "John Doe",
          createdAt: 1726757643336,
          updatedAt: 1726757643336,
        },
      ]);
    };

    return (
      <CommentProvider
        type="edit"
        comments={comments}
        callbacks={{
          post: (comment) => handleOnPostComment(comment),
          put: ({ comment, commentId }) => console.log({ comment, commentId }),
          delete: (commentId) => console.log(commentId),
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "By passing `type='edit'` to the CommentProvider, it will expect a `comments` and `callbacks` props. The `callbacks` prop needs 3 keys with functions: `post`, `put`, `delete` to create, update or remove a comment. You can manage all three of these methods however you like.",
      },
    },
  },
};

export const UpdateComment: Story = {
  render: (_args) => {
    const [comments, setComments] = useState<CommentProps[]>([
      {
        id: "a2b1-cdf3",
        comment: "This is my first comment",
        authorId: "f6c5ea40",
        authorName: "John Doe",
        createdAt: 1726757643336,
        updatedAt: 1726757643336,
      },
    ]);

    const handleOnPutcomment = async ({ comment, commentId }) => {
      const updateComment = comments.find(
        (comment) => comment.id === commentId,
      );
      console.log({ updateComment });
      updateComment.comment = comment;
      setComments([updateComment]);
    };

    return (
      <CommentProvider
        type="edit"
        comments={comments}
        callbacks={{
          post: (comment) => console.log(comment),
          put: ({ comment, commentId }) =>
            handleOnPutcomment({ comment, commentId }),
          delete: (commentId) => console.log(commentId),
        }}
      />
    );
  },
};

export const DeleteComment: Story = {
  render: (_args) => {
    const [comments, setComments] = useState<CommentProps[]>([
      {
        id: "a2b1-cdf3",
        comment: "This is my first comment",
        authorId: "f6c5ea40",
        authorName: "John Doe",
        createdAt: 1726757643336,
        updatedAt: 1726757643336,
      },
    ]);

    const handleOnDeleteComment = async ({ commentId }) => {
      setComments([]);
    };

    return (
      <CommentProvider
        type="edit"
        comments={comments}
        callbacks={{
          post: (comment) => console.log(comment),
          put: ({ comment, commentId }) => console.log({ comment, commentId }),
          delete: (commentId) => handleOnDeleteComment(commentId),
        }}
      />
    );
  },
};

export const ReadComments: Story = {
  render: (_args) => {
    return (
      <CommentProvider
        type="read"
        comments={[
          {
            id: "a2b1-cdf3",
            comment: "This is my first comment",
            authorId: "64bfd-30eab",
            authorName: "John Doe",
            createdAt: 1726757643336,
            updatedAt: 1726757643336,
          },
        ]}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "By passing the `type='read'` prop to the CommentProvider, it will display the list as read-only, with no actions available and no option to create comments.",
      },
    },
  },
};
