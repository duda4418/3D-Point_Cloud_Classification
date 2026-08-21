const points = [
  [50, 18, 2.1], [38, 24, 1.3], [63, 26, 1.5], [28, 34, 1.8], [48, 34, 1.2],
  [74, 37, 2.2], [18, 46, 1.2], [35, 45, 2], [57, 46, 1.4], [85, 50, 1.4],
  [24, 59, 2.2], [46, 58, 1.6], [67, 59, 2], [78, 70, 1.2], [35, 72, 1.3],
  [55, 75, 2.4], [15, 76, 1.4], [47, 88, 1.1], [68, 87, 1.5], [89, 82, 2],
]

const connections = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[3,7],[4,7],[4,8],[5,8],[5,9],[6,10],[7,10],[7,11],[8,11],[8,12],[9,12],[10,14],[10,16],[11,14],[11,15],[12,13],[12,15],[13,15],[13,19],[14,15],[14,17],[15,17],[15,18],[18,19]]

export function PointCloudGraphic() {
  return (
    <svg className="point-cloud" viewBox="0 0 100 100" role="img" aria-label="Abstract connected 3D point cloud">
      <ellipse className="point-cloud__orbit" cx="52" cy="54" rx="45" ry="27" transform="rotate(-12 52 54)" />
      <ellipse className="point-cloud__orbit" cx="52" cy="54" rx="29" ry="44" transform="rotate(27 52 54)" />
      {connections.map(([from, to]) => (
        <line
          className="point-cloud__line"
          key={`${from}-${to}`}
          x1={points[from][0]}
          y1={points[from][1]}
          x2={points[to][0]}
          y2={points[to][1]}
        />
      ))}
      {points.map(([x, y, radius], index) => (
        <circle
          className="point-cloud__dot"
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={radius}
          fill={index % 3 === 0 ? '#75e4ff' : index % 3 === 1 ? '#3fa9ff' : '#ffffff'}
        />
      ))}
    </svg>
  )
}
