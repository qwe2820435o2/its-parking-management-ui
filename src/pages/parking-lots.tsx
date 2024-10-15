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
        setParkingSpots((prevSpots) =>
            prevSpots.map((spot) => (spot.id === id ? { ...spot, status: 'busy' } : spot))
        );
    };

    const markFree = (id: number) => {
        setParkingSpots((prevSpots) =>
            prevSpots.map((spot) => (spot.id === id ? { ...spot, status: 'free' } : spot))
        );
    };

    // 停车位组件
    const ParkingSpot = ({ position, status }: { position: [number, number, number]; status: string }) => (
        <Box
            args={[2, 1, 4]} // 停车位的大小
            position={position} // 每个停车位的位置
            castShadow
            receiveShadow
        >
            <meshStandardMaterial
                color={status === 'free' ? '#7CFC00' : '#FF4500'} // 使用亮绿色和红色表示停车状态
                metalness={0.5} // 增加金属感
                roughness={0.1} // 增加反光效果
            />
        </Box>
    );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">3D Parking Lot Simulation</h1>

            <Canvas style={{height: '500px', width: '100%'}} shadows camera={{position: [15, 15, 15], fov: 60}}>
                {/* 灯光和阴影 */}
                <ambientLight intensity={0.4}/>
                <directionalLight position={[10, 20, 10]} intensity={1} castShadow/>
                <spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={1} castShadow/>

                {/* 添加地面 */}
                <Plane args={[30, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                    <meshStandardMaterial color="#CCCCCC"/>
                    {/* 使用浅灰色地面 */}
                </Plane>

                {/* 使用网格线模拟停车位划线 */}
                <gridHelper args={[30, 30, '#000000', '#FFFFFF']} position={[0, -0.49, 0]}/>

                {/* 渲染停车位 */}
                {parkingSpots.map((spot, index) => (
                    <ParkingSpot
                        key={spot.id}
                        position={[(index % 5) * 3 - 6, 0, Math.floor(index / 5) * 5 - 6]} // 网格布局
                        status={spot.status}
                    />
                ))}

                {/* 摄像机控制器 */}
                <OrbitControls/>
            </Canvas>

            {/* 控制面板 */}
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