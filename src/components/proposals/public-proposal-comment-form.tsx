"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { commentOnProposal } from "@/server/actions/proposal-public";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PublicProposalCommentForm({ shareToken }: { shareToken: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({ author: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    startTransition(async () => {
      const result = await commentOnProposal(shareToken, values);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setValues({ author: "", message: "" });
      toast.success("Comment posted");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="comment-author" className="text-xs">
          Your name
        </Label>
        <Input
          id="comment-author"
          value={values.author}
          onChange={(e) => setValues((v) => ({ ...v, author: e.target.value }))}
          disabled={isPending}
        />
        <FieldError errors={fieldErrors.author} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="comment-message" className="text-xs">
          Comment
        </Label>
        <Textarea
          id="comment-message"
          rows={3}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          disabled={isPending}
        />
        <FieldError errors={fieldErrors.message} />
      </div>
      <Button type="submit" variant="outline" size="sm" disabled={isPending}>
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        Post comment
      </Button>
    </form>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <>
      {errors.map((err) => (
        <p key={err} className="text-sm text-destructive">
          {err}
        </p>
      ))}
    </>
  );
}
