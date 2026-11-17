/** Illustrations vectorielles locales : aucun équipement ou achat réel n’est revendiqué. */
export function EquipmentVisual({ kind = "workstation" }: { kind?: string }) {
  return (
    <svg
      viewBox="0 0 420 245"
      fill="none"
      className="equipment-visual"
      aria-hidden="true"
    >
      <ellipse
        cx="210"
        cy="214"
        rx="150"
        ry="18"
        fill="#0b2146"
        opacity=".06"
      />
      {kind === "gpu" ? (
        <>
          <path
            d="m120 60 130-20 60 30v132l-135 22-55-28z"
            fill="#e7eaf0"
            stroke="#9caec4"
          />
          <path d="m175 89 135-19v132l-135 22z" fill="#142b4b" />
          <path d="m120 60 55 29v135l-55-28z" fill="#aab9cb" />
          {[116, 165].map((y) => (
            <g key={y}>
              <ellipse
                cx="240"
                cy={y}
                rx="24"
                ry="20"
                fill="#0b1b33"
                stroke="#647590"
              />
              <ellipse
                cx="240"
                cy={y}
                rx="14"
                ry="12"
                stroke="#b60055"
                strokeWidth="3"
              />
              <circle cx="240" cy={y} r="3" fill="#b60055" />
            </g>
          ))}
          <path d="m190 92 75-11" stroke="#e5afca" />
          <circle cx="290" cy="90" r="3" fill="#74d5bb" />
        </>
      ) : kind === "network-kit" ? (
        <>
          <path
            d="m80 128 180-35 84 43-184 36z"
            fill="#dde5ef"
            stroke="#9caec4"
          />
          <path d="m80 128 80 44v38l-80-45z" fill="#9caec4" />
          <path d="m160 172 184-36v38l-184 36z" fill="#173656" />
          {[185, 216, 247, 278, 309].map((x) => (
            <path
              key={x}
              d={`m${x} ${180 - (x - 185) * 0.2} 19-4v12l-19 4z`}
              fill="#07192c"
              stroke="#a6b6cb"
            />
          ))}
          <path
            d="M120 135V65m172 56V50"
            stroke="#173656"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M108 55q12-15 24 0m145-15q15-17 30 0"
            stroke="#b60055"
            strokeWidth="2"
          />
          <circle cx="172" cy="183" r="3" fill="#81d9b8" />
        </>
      ) : kind === "project-kit" ? (
        <>
          <path
            d="m100 139 137-48 85 54-138 50z"
            fill="#277b76"
            stroke="#0c4a4b"
          />
          <path
            d="m100 139 84 56v15l-84-55zm84 56 138-50v15l-138 50z"
            fill="#165e5a"
          />
          <path
            d="m172 137 47-16 32 20-47 17z"
            fill="#122442"
            stroke="#aeb7c5"
          />
          <path d="m121 145 22-8 20 12-23 8z" fill="#e3e7eb" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`m${198 + i * 16} ${181 - i * 6}v-14`}
              stroke="#d2b06c"
              strokeWidth="5"
            />
          ))}
          <path
            d="M255 127v-50q0-20-30-20h-40"
            stroke="#b60055"
            strokeWidth="3"
          />
          <circle cx="180" cy="57" r="10" fill="#dbe2ee" stroke="#173656" />
          <circle cx="180" cy="57" r="4" fill="#173656" />
        </>
      ) : (
        <>
          <path d="m94 45 202-15 30 15-202 19z" fill="#e8edf3" />
          <path d="m94 45 30 19v130l-30-15z" fill="#b6c4d6" />
          <path d="m124 64 202-19v131l-202 18z" fill="#112b4e" />
          <path d="m135 75 180-17v105l-180 17z" fill="#eef1f7" />
          <path d="m202 187 40-4v25l30 7-86 10-25-9 41-8z" fill="#aabbd0" />
          <path d="m161 216 25 9 86-10" stroke="#e3e8ee" strokeWidth="3" />
          <path
            d="m153 94 48-4m-48 15 77-7m-77 18 37-3m-37 16 62-6"
            stroke="#8799b4"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="m238 112 12-19 10 23 14-35 18 26"
            stroke="#b60055"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="226" cy="181" r="3" fill="#e8edf3" />
          <path d="m277 205 43-4 19 13-44 5z" fill="#d8e0ea" stroke="#aabbd0" />
        </>
      )}
      <circle cx="75" cy="75" r="3" fill="#b60055" />
      <path d="M344 73h12m-6-6v12M65 188h8m-4-4v8" stroke="#8d9eb8" />
    </svg>
  );
}
