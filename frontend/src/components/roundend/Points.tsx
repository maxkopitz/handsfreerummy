import Container from '../ui/Container'
import { useProfile } from '../../hooks/Profile'
import Button from '../ui/Button'
import Card from '../game/Card'
import { Suit, Value } from '../../Type'

const Points = () => {
    

    return (
        <Container>
            <div className="flex flex-col justify-center items-center">
                <div className="h-44 mb-10">
                    
                </div>
                <div className="justify-center">
                    <div>
                        <label className="text-xl">
                            Points
                        </label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <h2 className="text-xl">Change Card Size</h2>
                    <div className="flex flex-row">
        
                    </div>
                </div>
                <div className="justify-center">
                    <h2 className="text-xl">Change Card Font Weight</h2>
                    <div className="flex flex-row">
                        
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Points
