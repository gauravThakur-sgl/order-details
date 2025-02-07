import Input from "./ui/Input";

interface IFormInputProps {
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  errors: any;
  required?: boolean;
}
export const FormInput = ({ name, label, onChange, register, errors, required }: IFormInputProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <Input
          {...register(`${name}`)}
          type="text"
          placeholder=""
          id="firstName"
          labelData={label}
          onChange={onChange}
          required={required}
        />
        {errors.firstName && <p className="text-red-500 text-sm">{String(errors.firstName.message)}</p>}{" "}
      </div>
    </div>
  );
};
