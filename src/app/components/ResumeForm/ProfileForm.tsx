import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="姓名"
          labelClassName="col-span-full"
          name="name"
          placeholder="萨尔曼·可汗"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="客观评价"
          labelClassName="col-span-full"
          name="summary"
          placeholder="致力于让教育免费化的创业者和教育家"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="邮箱"
          labelClassName="col-span-4"
          name="email"
          placeholder="hello@khanacademy.org"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="手机号"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="网站"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/in/khanacademy"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="地址"
          labelClassName="col-span-2"
          name="location"
          placeholder="纽约市"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
