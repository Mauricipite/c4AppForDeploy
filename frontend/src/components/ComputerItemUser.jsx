import { Link } from 'react-router-dom'

function ComputerItemUser({computer}) {

    return (
        <>

        <div className='computer'>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>inventoryCode</th>
                        <th>description</th>
                        <th>cpu</th>
                        <th>ram</th>
                        <th>storage</th>
                        <th>availability</th>
                        <th>category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{computer.inventoryCode}</td>
                        <td>{computer.description}</td>
                        <td>{computer.cpu}</td>
                        <td>{computer.ram}</td>
                        <td>{computer.storage}</td>
                        <td>{String(computer.availability)}</td>
                        <td>{computer.category}</td>
                    </tr>
                </tbody>
            </table>
            <Link to='/notyet'>
                <button className='btnot'>Rent!</button>
            </Link>
        </div>
        </>
    )
}

export default ComputerItemUser