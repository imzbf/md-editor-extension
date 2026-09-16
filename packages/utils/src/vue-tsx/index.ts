import { ComponentPublicInstance, SetupContext } from 'vue';

/**
 * 获取指定插槽内容
 * 方法约定：Vue 组件中插槽的优先级高于同名属性
 *
 * @param param0 组件实例 instance、上下文 ctx（setup 的第二个参数）和组件属性 props
 * @param name 插槽名或组件属性名
 * @returns 优先返回插槽内容，否则返回同名属性的值
 */
export const getSlot = (
  {
    instance,
    ctx,
    props = {}
  }: {
    instance?: ComponentPublicInstance;
    ctx?: SetupContext<Array<any>>;
    props?: any;
  },
  name = 'default'
) => {
  const targetSlot = instance?.$slots[name] || ctx?.slots[name];
  return (targetSlot ? targetSlot(instance) : '') || props[name];
};
