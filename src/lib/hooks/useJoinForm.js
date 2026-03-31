import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { joinSchema } from '@/components/JoinForm/JoinForm.schema';
import { api, publicApi } from '@/lib/fetchClient';

export function useJoinForm() {
  const router = useRouter();
  const [joinData, setJoinData] = useState({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setCheckShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...joinData, [name]: value };
    setJoinData(updated);

    if (updated.email === '' && updated.nickname === '') {
      setErrors({});
    } else if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const result = joinSchema.safeParse(joinData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(({ path, message }) => {
        fieldErrors[path[0]] = message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await publicApi.post('/auth/sign-up', {
        email: joinData.email,
        password: joinData.password,
        nickname: joinData.nickname,
      });

      router.push('/login');
    } catch (err) {
      const message = err?.message;
      if (message?.includes('이메일')) {
        setErrors((prev) => ({ ...prev, email: message }));
      } else if (message?.includes('닉네임')) {
        setErrors((prev) => ({ ...prev, nickname: message }));
      }
    }
  };

  return {
    joinData,
    errors,
    handleChange,
    handleSubmit,
    setShowPassword,
    showPassword,
    showCheckPassword,
    setCheckShowPassword,
  };
}
