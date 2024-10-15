import React, {useState} from 'react';
import { Box, OrbitControls, Plane, Text } from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

const ParkingLots = () => {

    const totalParkingSpots = 68; // 总共68个停车位
    const initialParkingSpots = Array.from({ length: totalParkingSpots }, (_, i) => ({
        id: i + 1,
        status: i % 2 === 0 ? 'free' : 'busy'
    }));

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

    // 停车位组件，添加编号
    const ParkingSpot = ({ position, status, id }: { position: [number, number, number]; status: string, id: number }) => (
        <>
            <Box
                args={[2, 1, 4.5]} // 统一停车位大小
                position={position} // 停车位的位置
                castShadow
                receiveShadow
            >
                <meshStandardMaterial
                    color={status === 'free' ? '#7CFC00' : '#FF4500'} // 使用亮绿色和红色表示停车状态
                    metalness={0.2} // 增加金属感
                    roughness={0.1} // 增加反光效果
                />
            </Box>
            {/* 显示编号 */}
            <Text
                position={[position[0], position[1] + 1.5, position[2]]} // 编号位置，高度增加
                fontSize={1.3} // 增大字体
                fontWeight="bold" // 加粗字体
                color="#000000" // 文字颜色
                anchorX="center"
                anchorY="middle"
            >
                {id}
            </Text>
        </>
    );

    // 计算回字型布局的停车位位置，确保每边都有间隔
    const calculateParkingPositions = () => {
        const positions: [number, number, number][] = [];
        const margin = 4; // 每个车位之间的间距

        // 上边停车位 (20个)
        for (let i = 0; i < 20; i++) {
            positions.push([i * margin - 38, 0, -45]); // 横向排列，固定Z轴
        }

        // 右边停车位 (20个)
        for (let i = 0; i < 14; i++) {
            positions.push([45, 0, i * 6 - 38]); // 纵向排列，固定X轴
        }

        // 下边停车位 (20个)
        for (let i = 0; i < 20; i++) {
            positions.push([i * margin - 38, 0, 45]); // 横向排列，固定Z轴
        }

        // 左边停车位 (20个)
        for (let i = 0; i < 14; i++) {
            positions.push([-45, 0, i * 6 - 38]); // 纵向排列，固定X轴
        }

        return positions;
    };

    const parkingPositions = calculateParkingPositions();

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">3D Parking Lot Simulation</h1>

            <Canvas style={{height: '500px', width: '100%'}} shadows camera={{position: [45, 35, 45], fov: 60}}>
                {/* 灯光和阴影 */}
                <ambientLight intensity={0.4}/>
                <directionalLight position={[10, 20, 10]} intensity={1} castShadow/>
                <spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={1} castShadow/>

                {/* 添加地面 */}
                <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                    <meshStandardMaterial color="#CCCCCC"/>
                </Plane>

                {/* 使用回字型布局渲染停车位 */}
                {parkingSpots.map((spot, index) => (
                    <ParkingSpot
                        key={spot.id}
                        position={parkingPositions[index]} // 回字型布局位置
                        status={spot.status}
                        id={spot.id} // 添加车位编号
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