import { useSection } from "deco/hooks/useSection.ts";
import type { AppContext } from "../apps/site.ts";
import { toFileUrl } from "std/path/mod.ts";

const ROOT = toFileUrl(Deno.cwd()).href;

interface Props {
  /**
   * @format rich-text
   * @title Title Text
   */
  titleText?: string;
  /**
   * @format rich-text
   * @title Button Text
   */
  buttonText?: string;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  return { ...props, titleText: "Hello" };
}

export function loader(props: Props) {
  return props;
}

export default function HelloSection({
  titleText = "",
  buttonText = "Click Me",
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
      <div class="container mx-auto py-12">
        <h2 class="text-3xl font-bold mb-4">{titleText}</h2>
        <form
          hx-post={generateSectionUrl({ titleText, buttonText })}
          hx-target="closest section"
          hx-swap="innerHTML"
        >
          <button type="submit" class="btn btn-primary">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}