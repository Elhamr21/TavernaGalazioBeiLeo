import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  textarea?: boolean
  type?: string
}

/** A labeled RHF-bound text input/textarea — the common case for every admin text field. */
export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  textarea,
  type,
}: TextFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea rows={3} {...field} value={field.value ?? ""} />
            ) : type === "number" ? (
              <Input
                type="number"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={field.value ?? ""}
                onChange={(event) => field.onChange(event.target.valueAsNumber)}
              />
            ) : (
              <Input type={type} {...field} value={field.value ?? ""} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
