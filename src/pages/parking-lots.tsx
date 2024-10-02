import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

const ParkingLots = () => {

    const initialParkingSpots = [
        {id: 1, status: 'free'},
        {id: 2, status: 'busy'},
        {id: 3, status: 'free'},
        {id: 4, status: 'free'},
        {id: 5, status: 'busy'},
        {id: 6, status: 'free'},
        {id: 7, status: 'busy'},
        {id: 8, status: 'free'},
        {id: 9, status: 'free'},
        {id: 10, status: 'busy'},
        {id: 11, status: 'free'},
        {id: 12, status: 'busy'},
        {id: 13, status: 'free'},
        {id: 14, status: 'free'},
        {id: 15, status: 'busy'},
    ];

    const [parkingSpots, setParkingSpots] = useState(initialParkingSpots);
    const [selectedSpotId, setSelectedSpotId] = useState(Number);

    const markBusy = (id: number) => {
        setParkingSpots(prevSpots =>
            prevSpots.map(spot =>
                spot.id === id ? {...spot, status: 'busy'} : spot))
    }

    const markFree = (id: number) => {
        setParkingSpots(prevSpots =>
            prevSpots.map(spot =>
                spot.id === id ? {...spot, status: 'free'} : spot));
    }

    const freeSpots = parkingSpots.filter(spot => spot.status === 'free').length;
    const busySpots = parkingSpots.filter(spot => spot.status === 'busy').length;


    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Parking Lot Management</h1>

            <div className="flex justify-items-start items-center mb-4">
                <p>Free Spots: {freeSpots}</p>
                <p className="ml-6">Busy Spots: {busySpots}</p>
            </div>

            <div className="grid grid-cols-10 gap-4 mb-6">
                {parkingSpots.map(spot => (
                    <div key={spot.id} className={`w-24 h-24 flex items-center justify-center rounded-md
                    ${spot.status === 'free' ? 'bg-green-500' : 'bg-red-500'}`}>
                        <span>#{spot.id}</span>
                    </div>
                ))}
            </div>

            <div className="flex space-x-4">
                <Input className="max-w-24"  type="number" value={selectedSpotId} placeholder="Enter Spot ID"
                       onChange={(e) => setSelectedSpotId(Number(e.target.value))}/>
                <Button variant="destructive" onClick={() => markBusy(selectedSpotId)}>Mark Busy</Button>
                <Button variant="default" onClick={() => markFree(selectedSpotId)}>Mark Free</Button>
            </div>

        </div>
    );
};

export default ParkingLots;