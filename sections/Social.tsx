import { useSection } from "deco/hooks/useSection.ts";
import type { AppContext } from "../apps/site.ts";

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format rich-text
   */
  buttonText?: string;
  showTitle?: boolean;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  return { ...props, showTitle: true };
}

export function loader(props: Props) {
  return props;
}

export default function HelloSection({
  title = "Hello",
  buttonText = "Click me now",
  showTitle = false,
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
        {showTitle && <h2 class="text-3xl font-bold mb-4">{title}</h2>}
        <form
          hx-post={generateSectionUrl({ title, buttonText, showTitle: false })}
          hx-target="closest section"
          hx-swap="innerHTML"
          class="flex justify-center"
        >
          <button type="submit" class="btn btn-primary">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}