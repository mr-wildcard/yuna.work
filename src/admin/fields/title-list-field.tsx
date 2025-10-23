import { type ChangeEvent } from "react";
import { jsx, Stack, Text } from "@keystone-ui/core";
import { Button } from "@keystone-ui/button";
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
  TextInput,
} from "@keystone-ui/fields";
import {
  type CardValueComponent,
  type CellComponent,
  type FieldController,
  type FieldControllerConfig,
  type FieldProps,
} from "@keystone-6/core/types";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";

type TitleListValue = {
  title: string;
  items: string[];
};

const EMPTY_VALUE: TitleListValue = { title: "", items: [] };

const normaliseValue = (value: unknown): TitleListValue => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ...EMPTY_VALUE };
  }

  const { title, items } = value as {
    title?: unknown;
    items?: unknown;
  };

  return {
    title: typeof title === "string" ? title : "",
    items: Array.isArray(items)
      ? items.map((item) =>
          typeof item === "string" ? item : item == null ? "" : String(item),
        )
      : [],
  };
};

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const currentValue = value ?? { ...EMPTY_VALUE };
  const readOnly = onChange === undefined;

  const setValue = (next: TitleListValue) => {
    if (readOnly) return;
    onChange?.(next);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...currentValue, title: event.target.value });
  };

  const handleItemChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const nextItems = [...currentValue.items];
    nextItems[index] = event.target.value;
    setValue({ ...currentValue, items: nextItems });
  };

  const addItem = () => {
    setValue({ ...currentValue, items: [...currentValue.items, ""] });
  };

  const removeItem = (index: number) => {
    const nextItems = currentValue.items.filter((_, i) => i !== index);
    setValue({ ...currentValue, items: nextItems });
  };

  return (
    <FieldContainer>
      <FieldLabel htmlFor={`${field.path}--title`}>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>

      {readOnly ? (
        <Stack gap="small">
          <Text>{currentValue.title || "—"}</Text>
          {currentValue.items.length ? (
            <ul css={{ margin: 0, paddingLeft: "1.25rem" }}>
              {currentValue.items.map((item, index) => (
                <li key={index}>{item || "—"}</li>
              ))}
            </ul>
          ) : (
            <Text size="small" color="neutral500">
              No items
            </Text>
          )}
        </Stack>
      ) : (
        <Stack gap="small">
          <TextInput
            id={`${field.path}--title`}
            value={currentValue.title}
            onChange={handleTitleChange}
            autoFocus={autoFocus}
            aria-describedby={
              field.description === null
                ? undefined
                : `${field.path}-description`
            }
          />

          <Stack gap="xsmall">
            {currentValue.items.map((item, index) => (
              <Stack
                key={index}
                across
                gap="small"
                align="center"
                css={{ width: "100%" }}
              >
                <TextInput
                  value={item}
                  onChange={(event) => handleItemChange(index, event)}
                  aria-label={`Item ${index + 1}`}
                />
                <Button
                  size="small"
                  tone="negative"
                  onClick={() => removeItem(index)}
                  weight="light"
                >
                  Remove
                </Button>
              </Stack>
            ))}
            <Button tone="positive" size="small" onClick={addItem}>
              Add item
            </Button>
          </Stack>
        </Stack>
      )}
    </FieldContainer>
  );
};

const getDisplayValue = (value: TitleListValue | null | undefined) => {
  if (!value) return "—";
  const itemCount = value.items.length;
  return value.title
    ? `${value.title} (${itemCount})`
    : `${itemCount} item${itemCount === 1 ? "" : "s"}`;
};

export const Cell: CellComponent<typeof controller> = ({
  item,
  field,
  linkTo,
}) => {
  const value = normaliseValue(item[field.path]);
  const label = getDisplayValue(value);

  return linkTo ? (
    <CellLink {...linkTo}>{label}</CellLink>
  ) : (
    <CellContainer>{label}</CellContainer>
  );
};
Cell.supportsLinkTo = true;

export const CardValue: CardValueComponent<typeof controller> = ({
  item,
  field,
}) => {
  const value = normaliseValue(item[field.path]);

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <Stack gap="small">
        <Text>{value.title || "—"}</Text>
        {value.items.length ? (
          <ul css={{ margin: 0, paddingLeft: "1.25rem" }}>
            {value.items.map((item, index) => (
              <li key={index}>{item || "—"}</li>
            ))}
          </ul>
        ) : (
          <Text size="small" color="neutral500">
            No items
          </Text>
        )}
      </Stack>
    </FieldContainer>
  );
};

type ControllerConfig = FieldControllerConfig<{
  defaultValue?: { title?: string; items?: unknown[] } | null;
}>;

export const controller = (
  config: ControllerConfig,
): FieldController<TitleListValue, TitleListValue> => {
  const defaultValue = normaliseValue(config.fieldMeta?.defaultValue ?? null);

  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue,
    deserialize: (data) => normaliseValue(data[config.path]),
    serialize: (value) => ({ [config.path]: value }),
  };
};
