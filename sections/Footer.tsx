import { useSection } from "deco/hooks/useSection.ts";
import type { AppContext } from "../apps/site.ts";

interface Question {
  /**
   * @format rich-text
   */
  question: string;
  /**
   * @format rich-text
   */
  answer: string;
}

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @title Questions
   */
  questions: Question[];
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  const form = await req.formData();
  const index = parseInt(form.get("index") ?? "-1", 10);
  const questions = props.questions.map((question, i) => {
    if (i === index) {
      return { ...question, answer: form.get(`answer-${i}`) ?? "" };
    }
    return question;
  });
  return { ...props, questions };
}

export function loader(props: Props) {
  return props;
}

export default function FaqSection({
  title = "Frequently Asked Questions",
  questions = [],
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
        <h2 class="text-3xl font-bold mb-4">{title}</h2>
        <div class="accordion">
          {questions.map((question, index) => (
            <div class="accordion-item">
              <div class="accordion-header">
                <h3>{question.question}</h3>
              </div>
              <div class="accordion-content">
                <form
                  hx-post={generateSectionUrl({ title, questions })}
                  hx-target="closest .accordion-content"
                  hx-swap="innerHTML"
                >
                  <textarea
                    name={`answer-${index}`}
                    class="textarea textarea-bordered w-full"
                    rows={3}
                  >
                    {question.answer}
                  </textarea>
                  <input type="hidden" name="index" value={index} />
                  <button type="submit" class="btn btn-primary mt-2">
                    Save
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}