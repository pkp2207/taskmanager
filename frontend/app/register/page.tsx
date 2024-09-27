import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data :unknown) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await axios.post('/api/register', data); // Adjust the API endpoint accordingly
            // Handle successful registration (e.g., redirect)
        } catch (error) {
            console.error("Registration failed", error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username')} placeholder="Username" required />
            <input {...register('password')} type="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
