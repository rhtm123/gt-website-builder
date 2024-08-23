import { useTheme } from 'next-themes';


export default function Footer(){

    const { theme, setTheme } = useTheme();

    return (
        <>
        
        <select className="select select-sm" value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>

        </>
    )
}