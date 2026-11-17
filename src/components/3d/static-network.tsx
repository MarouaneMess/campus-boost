export function StaticNetwork({
  dark = false,
  active = true,
}: {
  dark?: boolean;
  active?: boolean;
}) {
  const nodes = [
    [110, 195],
    [210, 83],
    [401, 85],
    [508, 213],
    [444, 396],
    [230, 436],
    [85, 341],
    [335, 170],
    [375, 330],
    [207, 280],
  ];
  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 0],
    [0, 7],
    [1, 7],
    [2, 7],
    [3, 8],
    [4, 8],
    [5, 9],
    [6, 9],
    [7, 8],
    [8, 9],
    [9, 7],
  ];
  return (
    <svg
      className="static-network"
      viewBox="0 0 600 520"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="300"
        cy="260"
        rx="233"
        ry="188"
        stroke={dark ? "#627395" : "#cfd5dd"}
        strokeDasharray="3 7"
        transform="rotate(-25 300 260)"
      />
      <ellipse
        cx="300"
        cy="260"
        rx="235"
        ry="132"
        stroke={dark ? "#4b5b78" : "#cfd5dd"}
        transform="rotate(40 300 260)"
      />
      {connections.map(([a, b], i) => (
        <path
          key={i}
          d={`M ${nodes[a]} L ${nodes[b]}`}
          stroke={
            active && i % 3 === 0 ? "#c23176" : dark ? "#506386" : "#a6b2c6"
          }
          strokeWidth={i % 3 === 0 ? 1.4 : 0.7}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 12 : 7}
            fill={
              i % 3 === 0 && active ? "#b60055" : dark ? "#a9bad9" : "#17385c"
            }
          />
          <circle
            cx={x - 2}
            cy={y - 3}
            r={i % 3 === 0 ? 4 : 2}
            fill="white"
            opacity="0.45"
          />
        </g>
      ))}
      <path
        d="m300 191 61 35v69l-61 35-61-35v-69z"
        fill={dark ? "#e4e9f1" : "#f7f8fb"}
        stroke="#b60055"
        strokeWidth="1.5"
      />
      <path d="m300 191 0 69 61-34M300 260l-61-34m61 34v70" stroke="#bcc8db" />
      <circle cx="300" cy="260" r="9" fill="#b60055" />
    </svg>
  );
}
