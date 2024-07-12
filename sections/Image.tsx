import { useSection } from "deco/hooks/useSection.ts";
import type { AppContext } from "../apps/site.ts";
import type { HTMLWidget } from 'apps/admin/widgets.ts';

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format rich-text
   * @title Input Placeholder
   */
  inputPlaceholder?: string;
  /**
   * @format rich-text
   * @title Button Text
   */
  buttonText?: string;
  content?: HTMLWidget;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  const form = await req.formData();
  const response = `${form.get("response") ?? ""}`;
  if (!response) {
    return { ...props, content: { content: `You didn't answer.` } };
  }
  return { ...props, content: { content: `You answered: ${response}` } };
}

export function loader(props: Props) {
  return props;
}

export default function FormSection({
  title = "Say something",
  inputPlaceholder = "Enter your text here...",
  buttonText = "Submit",
  content = { content: "Result will appear here." },
}: Props) {

  const generateSectionUrl = (props: Props, otherProps: { href?: string } = {}) => {
    const sectionProps = {
      ...otherProps,
      props,
    };
    return useSection(sectionProps);
  };

  return (
    <section>
      <div class="container text-center mx-auto py-12">
        <h2 class="text-3xl font-bold mb-4">{title}</h2>
        <form
          hx-post={generateSectionUrl({ title, inputPlaceholder, buttonText, content })}
          hx-target="closest section"
          hx-swap="innerHTML"
          class="flex justify-center"
        >
          <input
            type="text"
            name="response"
            placeholder={inputPlaceholder}
            class="input input-bordered w-full mb-4"
          />
          <button type="submit" class="btn btn-primary">
            {buttonText}
          </button>
        </form>
        <div class="mt-12">{content?.content}</div>
      </div>
    </section>
  );
}