import React, {useState} from 'react';
import {Box, OrbitControls, Plane} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

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
    const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);

    const markBusy = (id: number) => {
        setParkingSpots(prevSpots =>
            prevSpots.map(spot => (spot.id === id ? { ...spot, status: 'busy' } : spot))
        );
    };

    const markFree = (id: number) => {
        setParkingSpots(prevSpots =>
            prevSpots.map(spot => (spot.id === id ? { ...spot, status: 'free' } : spot))
        );
    };

    const ParkingSpot = ({ position, status }: { position: [number, number, number]; status: string }) => (
        <Box
            args={[2, 1, 4]} // 停车位的尺寸
            position={position} // 每个停车位的位置
            castShadow
            receiveShadow
            material-color={status === 'free' ? 'green' : 'red'} // 颜色显示停车位状态
        >
            <meshStandardMaterial color={status === 'free' ? 'green' : 'red'} />
        </Box>
    );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Parking Lot Management (3D Model)</h1>

            {/* 3D 停车场渲染区域 */}
            <Canvas style={{height: '500px', width: '100%'}} shadows camera={{position: [10, 10, 10], fov: 50}}>
                {/* 灯光设置 */}
                <ambientLight intensity={0.4}/>
                <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow/>
                <spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={1} castShadow/>

                {/* 地面 */}
                <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                    <meshStandardMaterial color="gray"/>
                </Plane>

                {/* 渲染停车位 */}
                {parkingSpots.map((spot, index) => (
                    <ParkingSpot
                        key={spot.id}
                        position={[index * 3 - 5, 0, 0]} // 停车位排列
                        status={spot.status}
                    />
                ))}

                {/* 摄像机控制器 */}
                <OrbitControls/>
            </Canvas>

            <div className="flex space-x-4 mt-4">
                <input
                    className="border p-2"
                    type="number"
                    value={selectedSpotId || ''}
                    placeholder="Enter Spot ID"
                    onChange={(e) => setSelectedSpotId(Number(e.target.value))}
                />
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => selectedSpotId && markBusy(selectedSpotId)}
                >
                    Mark Busy
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => selectedSpotId && markFree(selectedSpotId)}
                >
                    Mark Free
                </button>
            </div>
        </div>
    );
};

export default ParkingLots;