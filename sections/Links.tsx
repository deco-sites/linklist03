import { useSection } from "deco/hooks/useSection.ts";
import type { AppContext } from "../apps/site.ts";

interface Props {
  initialValue?: number;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  const form = await req.formData();
  const count = parseInt(form.get("count") ?? "0", 10);
  return { ...props, initialValue: count };
}

export function loader(props: Props) {
  return props;
}

export default function CounterSection({
  initialValue = 0,
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
        <h2 class="text-3xl font-bold mb-4">Interactive Counter</h2>
        <form
          hx-post={generateSectionUrl({ initialValue })}
          hx-target="closest section"
          hx-swap="innerHTML"
        >
          <p>Current Count: {initialValue}</p>
          <button
            type="button"
            class="btn btn-primary"
            hx-get={`${generateSectionUrl({ initialValue: initialValue + 1 })}`}
          >
            Increment
          </button>
        </form>
      </div>
    </section>
  );
}      