# Buffer

## Buffer 结构

```js
// SlowBuffer 现已弃用
JavaScript => Buffer/SlowBuffer
                    ^
                    |
C++        => node_buffer
```

Buffer所占用的内存并非 v8 分配的，属于堆外内存。为何采用堆外内存？

### Buffer 对象

1. 与 `Array` 有何相似之处？
2. 为 Buffer 填充非法数据如大于 255、小于0或者小数时会如何处理？
3. 如何创建 Buffer？

### Buffer 内存分配

1. 为何需要在 C++ 层面上申请内存，在 JavaScript 中分配内存的机制？
2. 解释一下 `slab` 分配机制？

```shell
empty | full | partial
```

Node 以 8KB 为界限来区分 Buffer 是大对象还是小对象：

```js
Buffer.poolSize = 8 * 1024;
```

8KB 为每个 slab 的大小，在 JavaScript 层面，以它作为单位单元进行内存的分配
