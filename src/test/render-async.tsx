import { render } from "@testing-library/react";
import type { ReactNode } from "react";

/**
 * App Router pages are async server components. React's client renderer
 * cannot await them, so resolve the element first and render the result.
 */
export async function renderAsync(element: Promise<ReactNode> | ReactNode) {
  return render(await element);
}

/** Wrap a locale the way Next hands it to a page: as a promise. */
export function localeParams(locale: string) {
  return { params: Promise.resolve({ locale }) };
}
