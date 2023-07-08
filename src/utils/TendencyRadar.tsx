import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface RadarData {
  name: string;
  value: number;
}
interface TendencyRadarProps {
  data: RadarData[];
}

export default function TendencyRadar({ data }: TendencyRadarProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="78%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis
          domain={[0, 5]}
          ticks={[1, 2, 3, 4, 5] as any}
          angle={150}
        />
        <Radar
          name="value"
          dataKey="value"
          stroke="#06c387"
          fill="#06c387"
          fillOpacity={0.45}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
