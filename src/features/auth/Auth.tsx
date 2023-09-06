import { Outlet } from 'react-router-dom';


export const Auth = () => {
	return <div className="bg-blue-100 min-h-screen box-border py-10 flex justify-center items-center">
		<Outlet></Outlet>
	</div>
}
