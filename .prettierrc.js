// prettier的所有配置项文档 https://prettier.io/docs/en/options.html
module.exports = {
  // 每行字符达到这个阈值就会换行(默认80)
  printWidth: 100,

  // 指定缩进的空格数(默认2)
  tabWidth: 2,

  // 指定是否用tabs缩进(默认false)
  useTabs: false,

  // 是否在语句末尾加分号(默认true)
  semi: false,

  // 是否使用单引号(默认false)
  singleQuote: true,

  /**
   * 对象属性的引号使用
   * as-needed 仅在需要的时候使用
   * consistent 有一个属性需要引号，就都需要引号
   * preserve 保留用户输入的情况
   */
  quoteProps: 'as-needed',

  // jsx里是否使用单引号(默认false)
  jsxSingleQuote: true,

  /**
   * 多行时的行尾逗号(单行数组是永远不会有行尾逗号的)(v2.0.0开始默认值从 none 变成了 es5)
   * es5 在ES5中有效的结尾逗号（对象，数组等）
   * none 没有行尾逗号
   * all 尽可能使用行尾逗逗号
   */
  trailingComma: 'es5',

  /**
   * 字面量对象括号中的空格(默认true)
   * true: { foo: bar }
   * false: {foo: bar}
   */
  bracketSpacing: true,

  /**
   * 是否将jsx行尾的 `>` 放在最后一行而非单独另起一行(默认false)
   */
  jsxBracketSameLine: false,

  /**
   * arrowParens 箭头函数中的括号(默认always)
   * avoid 在有需要的时候使用
   * always 一直使用
   */
  arrowParens: 'always',

  /**
   * 仅格式化文件的一部分，这个感觉一般用不到(默认0~Infinity)
   */
  rangeStart: 0,
  rangeEnd: Infinity,

  /**
   * 指定要使用的解析器，prettier自动从输入文件路径推断出解析器，因此您不必更改此设置，所以该配置注释掉
   */
  // parser: '',

  /**
   * 指定用于推断要使用的解析器的文件名
   * 该选项是给CLI和API用的，在配置文件里配置没有意义，所以注释调
   */
  // filepath: '',

  /**
   * 从v1.7.0开始支持
   * 开启该选项可以让prettier仅格式化在文件顶部包含 特定格式的注释 的文件(默认false)
   * 如果一个项目之前没用prettier，后面想引入prettier，开启这个选项可以渐进的一个个文件改进
   * 具体的注释格式看文档
   */
  requirePragma: false,

  /**
   * 从v1.8.0开始支持
   * 开启该选项会在prettier格式化过的文件顶部插入一个`@format`注释标记(默认false)
   */
  insertPragma: false,

  /**
   * 从v1.8.2开始支持(默认preserve)
   * 默认情况下，Prettier将按原样包装markdown文本，因为有些服务使用对换行符敏感的渲染器，例如GitHub comment和BitBucket。在某些情况下，您可能希望改用编辑器/查看器软包装，因此此选项允许您使用 never 选项退出
   * always 超过打印宽度，则自动换行
   * never 不换行
   * preserve 按原样换行 自v1.9.0开始可用
   */
  proseWrap: 'never',

  /**
   * 从v1.15.0开始支持(默认css)
   * 指定html文件的全局空格敏感度 https://prettier.io/blog/2018/11/07/1.15.0.html#whitespace-sensitive-formatting
   * css 遵守css display属性的默认值
   * strict 空格敏感
   * ignore 空格不敏感
   */
  htmlWhitespaceSensitivity: 'strict',

  /**
   * 从v1.19.0开始支持(默认false)
   * 是否缩进vue文件 <script> 和 <style> 标签里的代码
   */
  vueIndentScriptAndStyle: false,

  /**
   * 从v1.15.0开始支持，v2.0.0开始默认值从 auto 变成了 lf
   * 行末尾标识
   * auto | lf | crlf | cr
   */
  endOfLine: 'auto',

  /**
   * 从v2.1.0开始支持(默认auto)
   * 是否格式化 嵌入式代码，比如markdown的代码块
   * auto 自动识别
   * off 不格式化
   */
  embeddedLanguageFormatting: 'auto',
}
