import { useForm } from 'react-hook-form';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result.success) navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input {...register('name')} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" {...register('email')} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input {...register('phone')} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" {...register('password')} className="w-full border p-2 rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}