import { inquiryLink, makeBrief, scents, spaces } from "../data/studio";

export function initStudio(root: HTMLElement) {
  const find = <T extends HTMLElement = HTMLElement>(selector: string) =>
    root.querySelector<T>(selector)!;
  const controls = find("[data-controls]");
  const photo = find("[data-photo]");
  const copy = find<HTMLButtonElement>("[data-copy]");
  const manualCopy = find("[data-manual-copy]");
  const status = find("[data-status]");
  let displayedSpace: string = spaces[0].id;

  function selection() {
    const spaceId = find<HTMLInputElement>('input[name="space"]:checked').value;
    const scentId = find<HTMLInputElement>('input[name="scent"]:checked').value;
    return {
      space: spaces.find((item) => item.id === spaceId) ?? spaces[0],
      scent: scents.find((item) => item.id === scentId) ?? scents[0],
    };
  }

  function render(updateUrl: boolean) {
    const { space, scent } = selection();
    if (displayedSpace !== space.id) {
      const template = find<HTMLTemplateElement>(
        `template[data-scene="${space.id}"]`,
      );
      photo.replaceChildren(template.content.cloneNode(true));
      displayedSpace = space.id;
    }
    find("[data-space-title]").textContent = space.title;
    find("[data-brief-space]").textContent = space.label;
    find("[data-brief-scent]").textContent = scent.name;
    find("[data-notes]").textContent = `${scent.notes}.`;
    find("[data-brief-aroma]").textContent = space.aroma;
    find("[data-profile]").textContent = `Ask to sample ${scent.name}.`;
    find("[data-brief-hospitality]").textContent = space.hospitality;
    find("[data-brief-technology]").textContent = space.technology;
    find<HTMLAnchorElement>("[data-inquire]").href = inquiryLink(space, scent);
    manualCopy.hidden = true;
    status.textContent = "";
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set("space", space.id);
      url.searchParams.set("scent", scent.id);
      history.replaceState(history.state, "", url);
    }
  }

  function readUrl() {
    const params = new URLSearchParams(location.search);
    const space =
      spaces.find((item) => item.id === params.get("space")) ?? spaces[0];
    const scent =
      scents.find((item) => item.id === params.get("scent")) ?? scents[0];
    find<HTMLInputElement>(`input[name="space"][value="${space.id}"]`).checked =
      true;
    find<HTMLInputElement>(`input[name="scent"][value="${scent.id}"]`).checked =
      true;
    render(false);
  }

  readUrl();
  controls.querySelectorAll("fieldset").forEach((field) => {
    field.disabled = false;
  });
  copy.hidden = false;
  controls.addEventListener("change", () => render(true));
  window.addEventListener("popstate", readUrl);
  copy.addEventListener("click", async () => {
    const { space, scent } = selection();
    const brief = makeBrief(space, scent);
    try {
      await navigator.clipboard.writeText(brief);
      status.textContent = "Brief copied.";
    } catch {
      manualCopy.hidden = false;
      const field = find<HTMLTextAreaElement>("[data-manual-copy] textarea");
      field.value = brief;
      field.focus();
      field.select();
      status.textContent = "Your brief is selected and ready to copy.";
    }
  });
}
