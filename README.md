# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```




<div className="flex flex-row justify-center items-center h-full max-w-[1110px] w-full md:pl-[165px] justify-center">
              <div className="flex flex-col md:flex-col justify-between flex-1 w-full h-full px-[24px] sm:px-[127px] md:px-0">
                {/* <span className="tracking-[4px] text-base sm:text-xl md:text-[28px] font-['Barlow_Condensed'] uppercase text-white mt-4">
                  <strong className="pr-2 font-bold opacity-30">03 </strong>
                  Space Launch 101
                </span> */}

                <div className="flex items-center justify-center w-full h-full">
                  <div className="flex items-center justify-center gap-12 flex-col md:flex-row">
                    {/* Botoes */}
                    <div className="flex flex-row md:flex-col w-full justify-center md:max-w-[80px] gap-6">
                      {technologys.map((tech, index) => (
                        <div
                          key={tech.name}
                          onClick={() => setSelectCrew(tech.name.toLowerCase())}
                          className={`w-[56px] h-[56px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center font-['Bellefair'] text-[32px] cursor-pointer transition delay-150 duration-300 ease-in-out hover:border-white ${
                            selectCrew === tech.name.toLowerCase()
                              ? "bg-white border border-white text-gray-900"
                              : "bg-transparent border border-gray-500 text-white"
                          }`}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>

                    {/* Conteudo texto */}
                    <div className="flex flex-col justify-center items-center md:items-start w-full h-full md:max-w-[491px]">
                      <h2 className="text-lg sm:text-2xl md:text-[32px] font-['Bellefair'] uppercase opacity-50">
                        THE TERMINOLOGY…
                      </h2>
                      <h1 className="text-2xl md:text-[40px] md:text-[56px] leading-16 font-['Bellefair'] font-normal uppercase text-white py-2 tracking-[1px]">
                        {currentCrew?.name}
                      </h1>
                      <p className="text-base md:text-lg font-thin leading-8 w-full font-['Barlow']">
                        {currentCrew?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>