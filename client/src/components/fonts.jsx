import { Poppins } from 'next/font/google';

export const poppins = Poppins({
    subsets: ['latin'], // Or other desired subsets
    display: 'swap', // Ensures text is visible during font loading
    variable: '--font-poppins', // CSS variable name
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] // Specify desired weights
});