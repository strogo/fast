import { html, ref, slotted } from "@microsoft/fast-element";
import { Listbox } from "../listbox/listbox";
import { endTemplate, startTemplate } from "../patterns/start-end";
import type { Combobox } from "./combobox";

/**
 * The template for the {@link @microsoft/fast-foundation#(Select:class)} component.
 * @public
 */
export const ComboboxTemplate = html<Combobox>`
    <template
        autocomplete="${x => x.autocomplete}"
        class="${x => (x.open ? "open" : "")} ${x =>
            x.disabled ? "disabled" : ""} ${x => x.position}"
        role="${x => x.role}"
        tabindex="${x => (!x.disabled ? "0" : null)}"
        aria-disabled="${x => x.ariaDisabled}"
        aria-autocomplete="${x => x.autocomplete}"
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
        @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
        @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    >
        <div
            aria-activedescendant="${x => (x.open ? x.ariaActiveDescendant : null)}"
            aria-controls="${x => x.listboxId}"
            aria-expanded="${x => x.ariaExpanded}"
            aria-haspopup="listbox"
            class="control"
            part="control"
            role="button"
            ?disabled="${x => x.disabled}"
        >
            ${startTemplate}
            <slot name="field-container">
                <div class="selected-value" part="selected-value">
                    <slot name="input-field">
                        <input
                            class="input-field"
                            part="input-field"
                            type="text"
                            @input="${(x, c) => x.handleTextInput(c.event as InputEvent)}"
                            ${ref("control")}
                        />
                    </slot>
                </div>
                <div class="indicator" part="indicator" aria-hidden="true">
                    <slot name="indicator">
                        <svg
                            class="select-indicator"
                            part="select-indicator"
                            viewBox="0 0 12 7"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
                            />
                        </svg>
                    </slot>
                </div>
            </slot>
            ${endTemplate}
        </div>
        <div
            aria-disabled="${x => x.disabled}"
            class="listbox"
            id="${x => x.listboxId}"
            part="listbox"
            role="listbox"
            style="--max-height: ${x => x.maxHeight}px"
            ?disabled="${x => x.disabled}"
            ?hidden="${x => !x.open}"
        >
            <slot
                ${slotted({
                    filter: Listbox.slottedOptionFilter,
                    flatten: true,
                    property: "slottedOptions",
                })}
            ></slot>
        </div>
    </template>
`;
